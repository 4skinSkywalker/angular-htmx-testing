import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhxCallDirective, AhxComponentDirective, AhxPayloadDirective } from './ahx.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AhxPayloadDirective,
    AhxComponentDirective,
    AhxCallDirective,
  ],
  exports: [
    AhxPayloadDirective,
    AhxComponentDirective,
    AhxCallDirective,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class DirectiveModule { }
