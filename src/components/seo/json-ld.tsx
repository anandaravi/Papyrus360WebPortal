/**
 * Renders a JSON-LD structured-data script. Use in any server component to emit
 * schema.org markup for rich results.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
