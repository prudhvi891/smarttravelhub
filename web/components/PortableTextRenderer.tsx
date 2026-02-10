import { PortableText } from "@portabletext/react";

export default function PortableTextRenderer({ value }: any) {
  return (
    <PortableText
      value={value}
      components={{
        types: {
          undefined: () => null,
        },
        block: {
          normal: ({ children }) => (
            <p className="text-slate-700 leading-relaxed mb-4">{children}</p>
          ),
        },
      }}
    />
  );
}
