import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProject, fetchProjects } from "../store/projectsSlice";
import { RootState, AppDispatch } from "../store";

export default function AdminForm({ onClose }) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.projects);

  const [form, setForm] = useState({
    title: "",
    description: "",
    isPublished: false,
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  const fileRemove = () => {
    setFiles(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files || files.length === 0) return alert("Please upload files.");
    if (!form.title.trim()) return alert("Please enter a title.");

    // Convert files to base64
    const filesData = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              resolve({
                name: file.name,
                content: result.split(",")[1],
                type: file.type,
                webkitRelativePath: file.webkitRelativePath || "",
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    const payload = { ...form, files: filesData };

    const result = await dispatch(uploadProject(payload));

    if (uploadProject.fulfilled.match(result) && result.payload.success) {
      setSuccess("✅ Project uploaded successfully!");
      setForm({ title: "", description: "", isPublished: false });
      setFiles(null);
      dispatch(fetchProjects()); // refresh list
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-slate-00">
      <div className="max-w-lg p-6 mx-auto space-y-4 dark:bg-slate-800 shadow-lg rounded-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            ➕ Add New Project
          </h2>
          <button
            type="button"
            // onClick={() => window.location.reload()}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            name="title"
            placeholder="Enter project title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <a className="mt-1 text-xs text-gray-500">
            Demo URL will be: https://inspitech-lab.github.io/InspiTech-Lab-1/
            {form.title || "your-title"}/
          </a>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            name="description"
            placeholder="Enter project description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* File/Folder Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Folder/Files *
          </label>
          <input
            type="file"
            multiple
            webkitdirectory=""
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            Select a folder to upload. It will be automatically zipped and
            stored.
          </p>
          {files && files.length > 0 && (
            <button
              type="button"
              onClick={fileRemove}
              className="mt-2 text-xs text-red-600 hover:underline"
            >
              🗑️ Remove Files
            </button>
          )}

          {files && files.length > 0 && (
            <p className="mt-1 text-sm text-blue-600">
              📂 Selected: {files.length} files from folder
            </p>
          )}
        </div>

        <div className="p-3 text-xs text-gray-600 rounded-md bg-gray-50">
          <strong>Auto-generated values:</strong>
          <br />
          • Thumbnail: Default project image
          <br />• Live Demo: https://inspitech-lab.github.io/InspiTech-Lab-1/
          {form.title || "title"}/
        </div>

        {/* Published Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
            className="w-4 h-4 text-green-600 focus:ring-green-500"
          />
          <span className="text-gray-700">Published?</span>
        </label>

        {/* Submit Button */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e as any)}
          disabled={loading}
          className="w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Uploading..." : "💾 Save Project"}
        </button>

        {/* Error / Success Messages */}
        {error && (
          <div className="p-3 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-700 border border-green-200 rounded-md bg-green-50">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
