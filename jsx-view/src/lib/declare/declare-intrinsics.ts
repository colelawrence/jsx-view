// mark as a module for TypeScript
import "./declare-props"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * # `<a>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
       */
      a: HtmlAnchorProps

      /**
       * # `<abbr>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
       */
      abbr: HtmlProps<HTMLElement>

      /**
       * # `<address>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
       */
      address: HtmlProps<HTMLElement>

      /**
       * # `<area>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
       */
      area: HtmlAreaProps

      /**
       * # `<article>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
       */
      article: HtmlProps<HTMLElement>

      /**
       * # `<aside>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
       */
      aside: HtmlProps<HTMLElement>

      /**
       * # `<audio>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
       */
      audio: HtmlAudioProps

      /**
       * # `<b>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
       */
      b: HtmlProps<HTMLElement>

      /**
       * # `<base>`
       * Part of [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
       */
      base: HtmlBaseProps

      /**
       * # `<bdi>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
       */
      bdi: HtmlProps<HTMLElement>

      /**
       * # `<bdo>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
       */
      bdo: HtmlProps<HTMLElement>

      /**
       * # `<blockquote>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
       */
      blockquote: HtmlQuoteProps

      /**
       * # `<body>`
       * The HTML `<body>` Element represents the content of an HTML document. There can be only one `<body>` element in a document.
       *
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
       */
      body: HtmlBodyProps

      /**
       * # `<br>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
       */
      br: HtmlProps<HTMLElement>

      /**
       * # `<button>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
       */
      button: HtmlButtonProps

      /**
       * # `<canvas>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
       */
      canvas: HtmlCanvasProps

      /**
       * # `<caption>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
       */
      caption: HtmlProps<HTMLElement>

      /**
       * # `<cite>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
       */
      cite: HtmlProps<HTMLElement>

      /**
       * # `<code>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
       */
      code: HtmlProps<HTMLElement>

      /**
       * # `<col>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
       */
      col: HtmlTableColProps

      /**
       * # `<colgroup>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
       */
      colgroup: HtmlTableColProps

      /**
       * # `<data>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
       */
      data: HtmlDataProps

      /**
       * # `<datalist>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
       */
      datalist: HtmlDataListProps

      /**
       * # `<dd>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
       */
      dd: HtmlProps<HTMLElement>

      /**
       * # `<del>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
       */
      del: HtmlModProps

      /**
       * # `<details>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
       */
      details: HtmlDetailsProps

      /**
       * # `<dfn>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
       */
      dfn: HtmlProps<HTMLElement>

      /**
       * # `<div>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
       */
      div: HtmlProps<HTMLDivElement>

      /**
       * # `<dl>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
       */
      dl: HtmlProps<HTMLElement>

      /**
       * # `<dt>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
       */
      dt: HtmlProps<HTMLElement>

      /**
       * # `<em>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
       */
      em: HtmlProps<HTMLElement>

      /**
       * # `<embed>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
       */
      embed: HtmlEmbedProps

      /**
       * # `<fieldset>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
       */
      fieldset: HtmlFieldSetProps

      /**
       * # `<figcaption>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
       */
      figcaption: HtmlProps<HTMLElement>

      /**
       * # `<figure>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
       */
      figure: HtmlProps<HTMLElement>

      /**
       * # `<footer>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
       */
      footer: HtmlProps<HTMLElement>

      /**
       * # `<form>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
       */
      form: HtmlFormProps

      /**
       * # `<h1>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1
       */
      h1: HtmlProps<HTMLElement>

      /**
       * # `<h2>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2
       */
      h2: HtmlProps<HTMLElement>

      /**
       * # `<h3>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3
       */
      h3: HtmlProps<HTMLElement>

      /**
       * # `<h4>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4
       */
      h4: HtmlProps<HTMLElement>

      /**
       * # `<h5>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5
       */
      h5: HtmlProps<HTMLElement>

      /**
       * # `<h6>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6
       */
      h6: HtmlProps<HTMLElement>

      /**
       * # `<head>`
       * Part of [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
       */
      head: HtmlProps<HTMLElement>

      /**
       * # `<header>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
       */
      header: HtmlProps<HTMLElement>

      /**
       * # `<hr>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
       */
      hr: HtmlProps<HTMLElement>

      /**
       * # `<html>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
       */
      html: HtmlHtmlProps

      /**
       * # `<i>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
       */
      i: HtmlProps<HTMLElement>

      /**
       * # `<iframe>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
       */
      iframe: HtmlIFrameProps

      /**
       * # `<img>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
       */
      img: HtmlImageProps

      /**
       * # `<input>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
       */
      input: HtmlInputProps

      /**
       * # `<ins>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
       */
      ins: HtmlModProps

      /**
       * # `<kbd>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
       */
      kbd: HtmlProps<HTMLElement>

      /**
       * # `<label>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
       */
      label: HtmlLabelProps

      /**
       * # `<legend>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
       */
      legend: HtmlLegendProps

      /**
       * # `<li>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
       */
      li: HtmlLIProps

      /**
       * # `<link>`
       * Part of [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
       */
      link: HtmlLinkProps

      /**
       * # `<main>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
       */
      main: HtmlProps<HTMLElement>

      /**
       * # `<map>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
       */
      map: HtmlMapProps

      /**
       * # `<mark>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
       */
      mark: HtmlProps<HTMLElement>

      /**
       * # `<menu>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu
       */
      menu: HtmlMenuProps

      /**
       * # `<meta>`
       * Part of [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
       */
      meta: HtmlMetaProps

      /**
       * # `<meter>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
       */
      meter: HtmlMeterProps

      /**
       * # `<nav>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
       */
      nav: HtmlProps<HTMLElement>

      /**
       * # `<noscript>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
       */
      noscript: HtmlProps<HTMLElement>

      /**
       * # `<object>`
       * Part of [Embedded content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
       */
      object: HtmlObjectProps

      /**
       * # `<ol>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
       */
      ol: HtmlOListProps

      /**
       * # `<optgroup>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
       */
      optgroup: HtmlOptGroupProps

      /**
       * # `<option>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
       */
      option: HtmlOptionProps

      /**
       * # `<output>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
       */
      output: HtmlOutputProps

      /**
       * # `<p>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
       */
      p: HtmlProps<HTMLElement>

      /**
       * # `<param>`
       * Part of [Embedded content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param
       */
      param: HtmlParamProps

      /**
       * # `<picture>`
       * Part of [Embedded content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
       */
      picture: HtmlProps<HTMLElement>

      /**
       * # `<portal>`
       * Part of [Embedded content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal
       */
      portal: HtmlProps<HTMLElement>

      /**
       * # `<pre>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
       */
      pre: HtmlProps<HTMLElement>

      /**
       * # `<progress>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
       */
      progress: HtmlProgressProps

      /**
       * # `<q>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
       */
      q: HtmlQuoteProps

      /**
       * # `<rb>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rb
       */
      rb: HtmlProps<HTMLElement>

      /**
       * # `<rp>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
       */
      rp: HtmlProps<HTMLElement>

      /**
       * # `<rt>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
       */
      rt: HtmlProps<HTMLElement>

      /**
       * # `<rtc>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rtc
       */
      rtc: HtmlProps<HTMLElement>

      /**
       * # `<ruby>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
       */
      ruby: HtmlProps<HTMLElement>

      /**
       * # `<s>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
       */
      s: HtmlProps<HTMLElement>

      /**
       * # `<samp>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
       */
      samp: HtmlProps<HTMLElement>

      /**
       * # `<script>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
       */
      script: HtmlScriptProps

      /**
       * # `<section>`
       * Part of [Content sectioning elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
       */
      section: HtmlProps<HTMLElement>

      /**
       * # `<select>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
       */
      select: HtmlSelectProps

      /**
       * # `<small>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
       */
      small: HtmlProps<HTMLElement>

      /**
       * # `<source>`
       * Part of [Embedded content](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
       */
      source: HtmlSourceProps

      /**
       * # `<span>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
       */
      span: HtmlProps<HTMLElement>

      /**
       * # `<strong>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
       */
      strong: HtmlProps<HTMLElement>

      /**
       * # `<style>`
       * Part of [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
       */
      style: HtmlStyleProps

      /**
       * # `<sub>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
       */
      sub: HtmlProps<HTMLElement>

      /**
       * # `<summary>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
       */
      summary: HtmlProps<HTMLElement>

      /**
       * # `<sup>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
       */
      sup: HtmlProps<HTMLElement>

      /**
       * # `<table>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
       */
      table: HtmlTableProps

      /**
       * # `<tbody>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
       */
      tbody: HtmlProps<HTMLElement>

      /**
       * # `<td>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
       */
      td: HtmlTableDataCellProps

      /**
       * # `<template>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
       */
      template: HtmlProps<HTMLElement>

      /**
       * # `<textarea>`
       * Part of [Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
       */
      textarea: HtmlTextAreaProps

      /**
       * # `<tfoot>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
       */
      tfoot: HtmlTableSectionProps

      /**
       * # `<th>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
       */
      th: HtmlTableHeaderCellProps

      /**
       * # `<thead>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
       */
      thead: HtmlTableSectionProps

      /**
       * # `<time>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
       */
      time: HtmlTimeProps

      /**
       * # `<title>`
       * Part of [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
       */
      title: HtmlProps<HTMLElement>

      /**
       * # `<tr>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
       */
      tr: HtmlTableRowProps

      /**
       * # `<track>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
       */
      track: HtmlTrackProps

      /**
       * # `<u>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
       */
      u: HtmlProps<HTMLElement>

      /**
       * # `<ul>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
       */
      ul: HtmlProps<HTMLElement>

      /**
       * # `<var>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
       */
      var: HtmlProps<HTMLElement>

      /**
       * # `<video>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
       */
      video: HtmlVideoProps

      /**
       * # `<wbr>`
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
       */
      wbr: HtmlProps<HTMLElement>
    }

    // SVGs
    // Documentation and linking still in progress
    interface IntrinsicElements {
      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/altGlyph */
      altGlyph: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/altGlyphDef */
      altGlyphDef: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/altGlyphItem */
      altGlyphItem: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate */
      animate: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateColor */
      animateColor: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion */
      animateMotion: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform */
      animateTransform: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animation */
      animation: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle */
      circle: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath */
      clipPath: AnyProps

      /** SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/color */
      "color-profile": AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/cursor */
      cursor: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs */
      defs: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc */
      desc: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/discard */
      discard: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse */
      ellipse: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend */
      feBlend: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix */
      feColorMatrix: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer */
      feComponentTransfer: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite */
      feComposite: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix */
      feConvolveMatrix: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting */
      feDiffuseLighting: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap */
      feDisplacementMap: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDistantLight */
      feDistantLight: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDropShadow */
      feDropShadow: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood */
      feFlood: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncA */
      feFuncA: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncB */
      feFuncB: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncG */
      feFuncG: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncR */
      feFuncR: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur */
      feGaussianBlur: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage */
      feImage: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge */
      feMerge: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMergeNode */
      feMergeNode: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology */
      feMorphology: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset */
      feOffset: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/fePointLight */
      fePointLight: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting */
      feSpecularLighting: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpotLight */
      feSpotLight: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile */
      feTile: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence */
      feTurbulence: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter */
      filter: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/font */
      font: AnyProps

      /** @deprecated SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/font */
      "font-face": AnyProps

      /** @deprecated SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/font */
      "font-face-format": AnyProps

      /** @deprecated SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/font */
      "font-face-name": AnyProps

      /** @deprecated SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/font */
      "font-face-src": AnyProps

      /** @deprecated SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/font */
      "font-face-uri": AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject */
      foreignObject: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g */
      g: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/glyph */
      glyph: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/glyphRef */
      glyphRef: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/handler */
      handler: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/hkern */
      hkern: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image */
      image: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line */
      line: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient */
      linearGradient: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/listener */
      listener: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker */
      marker: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask */
      mask: AnyProps

      /** SVG element https://www.w3.org/TR/2016/CR-SVG2-20160915/shapes.html#MeshElement */
      mesh: AnyProps

      /** SVG element https://www.w3.org/TR/2016/CR-SVG2-20160915/pservers.html#MeshGradientElement */
      meshgradient: AnyProps

      /** SVG element https://www.w3.org/TR/2016/CR-SVG2-20160915/shapes.html#MeshElement */
      meshpatch: AnyProps

      /** SVG element https://www.w3.org/TR/2016/CR-SVG2-20160915/shapes.html#MeshElement */
      meshrow: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata */
      metadata: AnyProps

      /** @deprecated SVG element "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/missing */
      "missing-glyph": AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mpath */
      mpath: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path */
      path: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern */
      pattern: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon */
      polygon: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline */
      polyline: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/prefetch */
      prefetch: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient */
      radialGradient: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect */
      rect: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/set */
      set: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/solidColor */
      solidColor: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop */
      stop: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg */
      svg: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/switch */
      switch: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol */
      symbol: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tbreak */
      tbreak: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text */
      text: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath */
      textPath: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tref */
      tref: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan */
      tspan: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element */
      unknown: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use */
      use: AnyProps

      /** SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view */
      view: AnyProps

      /** @deprecated SVG element https://developer.mozilla.org/en-US/docs/Web/SVG/Element/vkern */
      vkern: AnyProps
    }
  }
}
