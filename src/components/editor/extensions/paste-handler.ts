import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Slice, DOMParser as PMDOMParser } from "prosemirror-model";

export const PasteHandler = Extension.create({
  name: "pasteHandler",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("pasteHandler"),
        props: {
          handlePaste(view: EditorView, event: ClipboardEvent): boolean {
            const html = event.clipboardData?.getData("text/html");
            if (!html) return false;

            // parse HTML string into a DOM Document (browser DOMParser)
            const domParser = new window.DOMParser();
            const doc = domParser.parseFromString(html, "text/html");

            // sanitize / remove unwanted nodes
            doc.querySelectorAll("img").forEach((el) => {
              //   const src = el.src;
              //   const srcSet = el.getAttribute("src");
              //     const sizes = el.getAttribute("sizes");

              // upload images and show toast afterwards and then append
              return el.remove();
            });

            // const uploadPromises = imgEls.map(async (el) => {
            //                 const src = el.getAttribute("src");
            //                 if (!src) return;

            //                 try {
            //                   let file: File | null = null;

            //                   if (src.startsWith("data:")) {
            //                     const res = await fetch(src);
            //                     const blob = await res.blob();
            //                     file = new File([blob], "pasted.png", { type: blob.type });
            //                   } else {
            //                     const res = await fetch(src);
            //                     const blob = await res.blob();
            //                     file = new File([blob], "pasted.png", { type: blob.type });
            //                   }

            //                   if (file) {
            //                     const url = await uploadFn(file);
            //                     el.setAttribute("src", url);
            //                   }
            //                 } catch (e) {
            //                   console.error("Image upload failed", e);
            //                 }
            //               });

            //               Promise.all(uploadPromises)
            //                 .then(() => {
            //                   const parser = PMDOMParser.fromSchema(view.state.schema);
            //                   const slice = parser.parseSlice(doc.body);
            //                   view.dispatch(view.state.tr.replaceSelection(slice).scrollIntoView());

            //                   toast.success("Images uploaded successfully");
            //                 })
            //                 .catch(() => {
            //                   toast.error("Failed to upload images");
            //                 })
            //                 .finally(() => {
            //                   setUploading(false);
            //                 });

            // Try whatever the view exposes under 'clipboardParser'
            // const clipboardParser = view.someProp("clipboardParser") as any;

            let slice: Slice | null = null;

            // if (clipboardParser) {
            //   // If it's a DOMParser instance (from prosemirror-model)
            //   if (typeof clipboardParser.parseSlice === "function") {
            //     slice = clipboardParser.parseSlice(doc.body);
            //   }
            //   // If it's a function (older/alternate API)
            //   else if (typeof clipboardParser === "function") {
            //     slice = clipboardParser(
            //       doc.body,
            //       event,
            //       view.state.selection.$from
            //     );
            //   }
            // }

            // Fallback: construct a parser from the current schema
            if (!slice) {
              const pmParser = PMDOMParser.fromSchema(view.state.schema);
              slice = pmParser.parseSlice(doc.body);
            }

            if (slice) {
              view.dispatch(
                view.state.tr.replaceSelection(slice).scrollIntoView()
              );
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});
