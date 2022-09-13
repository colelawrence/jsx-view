import type { Observable } from "rxjs"
import "./declare-values"

declare global {
  namespace JSX {
    type ComponentFunction<P extends Record<string, any>> = (props: P, children: JSX.Child[]) => JSX.Child
    /** Get the Props from the component function */
    type Props<T extends ComponentFunction<any>> = Parameters<T>[0]

    type StyleValueObject = {
      [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P] | Observable<CSSStyleDeclaration[P]> | undefined
    }

    type AnyHtmlPropValue = AnyValue | StyleValueObject

    interface HtmlProps<T extends HTMLElement = HTMLElement> {
      accesskey?: StringValue
      class?: StringValue
      /** "inherit" (default) | "true" | "false" */
      contenteditable?: Value<"inherit" | "true" | "false">
      dir?: StringValue
      hidden?: BooleanValue
      id?: StringValue
      role?: StringValue
      lang?: StringValue
      draggable?: BooleanValue
      spellcheck?: BooleanValue
      style?: StringValue | StyleValueObject
      tabindex?: StringValue
      title?: StringValue
      translate?: Value<"yes" | "no">
    }
    interface HtmlAnchorProps extends HtmlProps<HTMLAnchorElement> {
      href?: StringValue
      target?: StringValue
      download?: StringValue
      ping?: StringValue
      rel?: StringValue
      media?: StringValue
      hreflang?: StringValue
      type?: StringValue
    }
    interface HtmlAreaProps extends HtmlProps<HTMLAreaElement> {
      alt?: StringValue
      coords?: StringValue
      shape?: StringValue
      href?: StringValue
      target?: StringValue
      ping?: StringValue
      rel?: StringValue
      media?: StringValue
      hreflang?: StringValue
      type?: StringValue
    }
    interface HtmlAudioProps extends HtmlProps<HTMLAudioElement> {
      src?: StringValue
      autobuffer?: StringValue
      autoplay?: BooleanValue
      loop?: BooleanValue
      controls?: BooleanValue
    }
    interface HtmlBaseProps extends HtmlProps {
      href?: StringValue
      target?: StringValue
    }
    interface HtmlQuoteProps extends HtmlProps<HTMLQuoteElement> {
      cite?: StringValue
    }
    interface HtmlBodyProps extends HtmlProps<HTMLBodyElement> {}
    interface HtmlButtonProps extends HtmlProps<HTMLButtonElement> {
      action?: StringValue
      autofocus?: BooleanValue
      disabled?: BooleanValue
      enctype?: StringValue
      form?: StringValue
      method?: StringValue
      name?: StringValue
      novalidate?: BooleanValue
      target?: StringValue
      type?: StringValue
      value?: StringValue
    }
    interface HtmlDataListProps extends HtmlProps<HTMLDataListElement> {}
    interface HtmlCanvasProps extends HtmlProps<HTMLCanvasElement> {
      width?: NumberValue
      height?: NumberValue
    }
    interface HtmlTableColProps extends HtmlProps<HTMLTableColElement> {
      span?: StringValue
    }
    interface HtmlTableSectionProps extends HtmlProps<HTMLTableSectionElement> {}
    interface HtmlTableRowProps extends HtmlProps<HTMLTableRowElement> {}
    interface HtmlDataProps extends HtmlProps {
      value?: StringValue
    }
    interface HtmlEmbedProps extends HtmlProps<HTMLEmbedElement> {
      src?: StringValue
      type?: StringValue
      width?: NumberValue
      height?: NumberValue
      [anything: string]: AnyHtmlPropValue
    }
    interface HtmlFieldSetProps extends HtmlProps<HTMLFieldSetElement> {
      disabled?: BooleanValue
      form?: StringValue
      name?: StringValue
    }
    interface HtmlFormProps extends HtmlProps<HTMLFormElement> {
      acceptCharset?: StringValue
      action?: StringValue
      autocomplete?: StringValue
      enctype?: StringValue
      method?: StringValue
      name?: StringValue
      novalidate?: BooleanValue
      target?: StringValue
    }
    interface HtmlHtmlProps extends HtmlProps<HTMLHtmlElement> {
      manifest?: StringValue
    }
    interface HtmlIFrameProps extends HtmlProps<HTMLIFrameElement> {
      src?: StringValue
      srcdoc?: StringValue
      name?: StringValue
      sandbox?: StringValue
      seamless?: StringValue
      width?: NumberValue
      height?: NumberValue
    }
    interface HtmlImageProps extends HtmlProps<HTMLImageElement> {
      alt?: StringValue
      src?: StringValue
      crossorigin?: StringValue
      usemap?: StringValue
      ismap?: StringValue
      width?: NumberValue
      height?: NumberValue
    }
    interface HtmlInputProps extends HtmlProps<HTMLInputElement> {
      accept?: StringValue
      action?: StringValue
      alt?: StringValue
      autocomplete?: StringValue
      autofocus?: BooleanValue
      checked?: BooleanValue
      disabled?: BooleanValue
      enctype?: StringValue
      form?: StringValue
      height?: NumberValue
      list?: StringValue
      max?: NumberValue
      maxlength?: NumberValue
      method?: StringValue
      min?: NumberValue
      multiple?: BooleanValue
      name?: StringValue
      novalidate?: BooleanValue
      pattern?: StringValue
      placeholder?: StringValue
      readonly?: BooleanValue
      required?: BooleanValue
      size?: NumberValue
      src?: StringValue
      step?: NumberValue
      target?: StringValue
      type?: StringValue
      value?: StringValue | NumberValue
      width?: NumberValue
    }
    interface HtmlModProps extends HtmlProps<HTMLModElement> {
      cite?: StringValue
      datetime?: StringValue | DateValue
    }
    interface HtmlLabelProps extends HtmlProps<HTMLLabelElement> {
      form?: StringValue
      for?: StringValue
    }
    interface HtmlLIProps extends HtmlProps<HTMLLIElement> {
      value?: StringValue | NumberValue
    }
    interface HtmlLinkProps extends HtmlProps<HTMLLinkElement> {
      href?: StringValue
      crossorigin?: StringValue
      rel?: StringValue
      media?: StringValue
      hreflang?: StringValue
      type?: StringValue
      sizes?: StringValue
      integrity?: StringValue
    }
    interface HtmlMapProps extends HtmlProps<HTMLMapElement> {
      name?: StringValue
    }
    interface HtmlMetaProps extends HtmlProps<HTMLMetaElement> {
      name?: StringValue
      httpEquiv?: StringValue
      content?: StringValue
      charset?: StringValue
    }
    interface HtmlMeterProps extends HtmlProps<HTMLMeterElement> {
      value?: StringValue | NumberValue
      min?: StringValue | NumberValue
      max?: StringValue | NumberValue
      low?: StringValue | NumberValue
      high?: StringValue | NumberValue
      optimum?: StringValue | NumberValue
    }
    interface HtmlObjectProps extends HtmlProps<HTMLObjectElement> {
      data?: StringValue
      type?: StringValue
      name?: StringValue
      usemap?: StringValue
      form?: StringValue
      width?: NumberValue
      height?: NumberValue
    }
    interface HtmlOListProps extends HtmlProps<HTMLOListElement> {
      reversed?: BooleanValue
      start?: StringValue | NumberValue
    }
    interface HtmlOptGroupProps extends HtmlProps<HTMLOptGroupElement> {
      disabled?: BooleanValue
      label?: StringValue
    }
    interface HtmlOptionProps extends HtmlProps<HTMLOptionElement> {
      disabled?: BooleanValue
      label?: StringValue
      selected?: BooleanValue
      value?: StringValue
    }
    interface HtmlOutputProps extends HtmlProps<HTMLOutputElement> {
      for?: StringValue
      form?: StringValue
      name?: StringValue
    }
    interface HtmlParamProps extends HtmlProps<HTMLParamElement> {
      name?: StringValue
      value?: StringValue
    }
    interface HtmlProgressProps extends HtmlProps<HTMLProgressElement> {
      value?: StringValue | NumberValue
      max?: StringValue | NumberValue
    }
    interface HtmlLegendProps extends HtmlProps<HTMLLegendElement> {}
    interface HtmlMenuProps extends HtmlProps<HTMLMenuElement> {
      type?: StringValue
      label?: StringValue
    }
    interface HtmlScriptProps extends HtmlProps<HTMLScriptElement> {
      src?: StringValue
      type?: StringValue
      charset?: StringValue
      async?: BooleanValue
      defer?: BooleanValue
      crossorigin?: StringValue
      integrity?: StringValue
      text?: StringValue
    }
    interface HtmlDetailsProps extends HtmlProps<HTMLDetailsElement> {
      open?: BooleanValue
    }
    interface HtmlSelectProps extends HtmlProps<HTMLSelectElement> {
      autofocus?: BooleanValue
      disabled?: BooleanValue
      form?: StringValue
      multiple?: BooleanValue
      name?: StringValue
      required?: BooleanValue
      size?: NumberValue
    }
    interface HtmlSourceProps extends HtmlProps<HTMLSourceElement> {
      src?: StringValue
      type?: StringValue
      media?: StringValue
    }
    interface HtmlStyleProps extends HtmlProps<HTMLStyleElement> {
      media?: StringValue
      type?: StringValue
      disabled?: BooleanValue
      /** @deprecated https://www.w3schools.com/tags/att_scoped.asp */
      scoped?: BooleanValue
    }
    interface HtmlTableProps extends HtmlProps<HTMLTableElement> {}
    interface HtmlTableDataCellProps extends HtmlProps<HTMLTableDataCellElement> {
      colspan?: StringValue | NumberValue
      rowspan?: StringValue | NumberValue
      headers?: StringValue
    }
    interface HtmlTextAreaProps extends HtmlProps<HTMLTextAreaElement> {
      autofocus?: BooleanValue
      cols?: NumberValue
      dirname?: StringValue
      disabled?: BooleanValue
      form?: StringValue
      maxlength?: NumberValue
      minlength?: NumberValue
      name?: StringValue
      placeholder?: StringValue
      readonly?: BooleanValue
      required?: BooleanValue
      rows?: NumberValue
      wrap?: BooleanValue
    }
    interface HtmlTableHeaderCellProps extends HtmlProps<HTMLTableHeaderCellElement> {
      colspan?: StringValue | NumberValue
      rowspan?: StringValue | NumberValue
      headers?: StringValue
      scope?: StringValue
    }
    interface HtmlTimeProps extends HtmlProps<HTMLTimeElement> {
      datetime?: StringValue | DateValue
    }
    interface HtmlTrackProps extends HtmlProps<HTMLTrackElement> {
      default?: BooleanValue
      kind?: StringValue
      label?: StringValue
      src?: StringValue
      srclang?: StringValue
    }
    interface HtmlVideoProps extends HtmlProps<HTMLVideoElement> {
      src?: StringValue
      poster?: StringValue
      autobuffer?: StringValue
      autoplay?: BooleanValue
      loop?: BooleanValue
      controls?: BooleanValue
      width?: NumberValue
      height?: NumberValue
    }

    /** AnyProps is a general props definition for intrinsic elements (<a>, <div>, <iframe>, etc.) */
    interface AnyProps extends ElementProps {
      [attrName: string]: AnyValue
    }
  }
}
