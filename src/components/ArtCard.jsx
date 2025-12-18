import { supabase } from '../supabaseClient';
import { auth } from '../firebase/config';

// Ensure "export default" is at the start of the function
export default function ArtCard({ art, onDeleted }) {
  const isOwner = auth.currentUser?.uid === art.user_id;

  const handleDelete = async () => {
    if (!window.confirm("Delete this artwork?")) return;

    try {
      // Delete from Supabase Table
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', art.id);

      if (error) throw error;

      // Update the UI
      if (onDeleted) onDeleted(art.id);
      alert("Deleted successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Variable must be image_url to match your SQL table */}
      <img src={art.image_url} alt={art.title} className="w-full h-64 object-cover" />
      <div className="p-4 flex justify-between items-center">
        <h3 className="font-bold text-lg">{art.title}</h3>
        {isOwner && (
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm font-bold"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}