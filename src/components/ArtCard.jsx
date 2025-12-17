export default function ArtCard({ art }) {
  return (
    <div className="border rounded shadow-lg overflow-hidden">
      <img src={art.imageUrl} alt={art.title} className="w-full h-64 object-cover" />
      <div className="p-4"><h3 className="font-bold">{art.title}</h3></div>
    </div>
  );
}