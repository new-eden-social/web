import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector,
  OnChanges,
  OnDestroy
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji'

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);

    // We have to import all the modules that are going to be used inside
    // rich content here.
    @NgModule({
      imports: [CommonModule, RouterModule, EmojiModule],
      declarations: [decoratedCmp]
    })
    class DynamicHtmlModule { }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
       .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
        return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
      });
}

@Directive({ selector: 'html-outlet' })
export class HtmlOutletDirective implements OnChanges, OnDestroy {

  @Input()
  html: string;

  private cmpRef: ComponentRef<any>;

  constructor(
    private vcRef: ViewContainerRef,
    private compiler: Compiler
  ) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) {
      return;
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    console.log('changing html-outlet', this.html, !!this.cmpRef);

    const compMetadata = new Component({
        selector: 'dynamic-html',
        template: this.html,
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
