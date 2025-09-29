import "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Convert an image node into a figure with a caption.
       */
      convertToFigure: () => ReturnType;

      /**
       * Insert or update an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
    figure: {
      /**
       * Inserts a figure with an image and a caption
       */
      insertFigure: (options: Options) => ReturnType;
      /**
       * Convert a figure back into a plain image.
       */
      convertToImage: () => ReturnType;
    };
  }
}
