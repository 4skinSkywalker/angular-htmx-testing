import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { catchError, debounceTime, delay, exhaustMap, Observable, of, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';

const BASE_API_URL = "http://localhost:4000/";

@Directive({
  selector: '[ahx-component]'
})
export class AhxComponentDirective {
  @Input("ahx-component") component!: any;

  constructor() {}
}

@Directive({
  selector: '[ahx-payload]'
})
export class AhxPayloadDirective {
  @Input("ahx-payload") payload = {};

  constructor() { }
}

@Directive({
  selector: '[ahx-call]'
})
export class AhxCallDirective {
  private dispose!: Function;
  private $destroy = new Subject<void>();
  private $events = new Subject<void>();

  cmd = "";
  trigger = "";
  triggerModifiers: Record<string, number> = {};
  method = "";
  path = "";
  @Input("ahx-call")
  set _cmd(cmd: string) {
    this.cmd = cmd;
    const match = cmd.match(/(\((.*?)\))?(.*?):(.*)/); // The capture is (<event>:<modifier>)<method>:<url>
    if (!match) {
      return;
    }
    const triggers = match[2].split(":");
    // Follows the transformation from [ debounce, 1000, ... ] to { debounce: 1000, ... }
    this.trigger = triggers[0];
    this.triggerModifiers = triggers.slice(1)
      .map(m => (m.match(/(\D+)(\d+)/) || []).slice(1))
      .reduce((a, c) => (a[c[0]] = Number(c[1]), a), {} as Record<string, number>);
    this.method = match[3];
    this.path = match[4];
  }

  constructor(
    @Optional() private ahxPayload: AhxPayloadDirective,
    @Optional() private ahxComponent: AhxComponentDirective,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private http: HttpClient,
  ){}

  ngOnInit(){
    this.$events
      .pipe(
        takeUntil(this.$destroy),
        debounceTime(this.triggerModifiers["debounce"] || 0),
        delay(this.triggerModifiers["delay"] || 0),
        switchMap(() => { // Switch map cancels ongoing requests
          let reqObs: Observable<any>;
          if (this.method === "get") {
            reqObs = (this.http as any)[this.method](BASE_API_URL + this.path); // GET requests have no body
          } else {
            reqObs = (this.http as any)[this.method](BASE_API_URL + this.path, this.ahxPayload?.payload || {});
          }
          return this.triggerModifiers["every"]
            ? timer(0, this.triggerModifiers["every"]).pipe(
              exhaustMap(() => // Exhaust map means it's never faster than response
                reqObs.pipe(catchError(() => of({ __error: true })))
              )
            )
            : reqObs.pipe(catchError(() => of({ __error: true })));
        }),
        tap((res: any) => {
          if (res.__error || !this.ahxComponent?.component) {
            return;
          }
          this.ahxComponent.component.data = res;
        })
      )
      .subscribe();

    this.dispose = this.renderer.listen(
      this.elementRef.nativeElement,
      this.trigger || "click",
      () => this.$events.next()
    );
  }

  ngOnDestroy(){
    this.dispose();
    this.$destroy.next();
  }
}