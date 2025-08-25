import React from "react";
import Image from "next/image";
import HtmlRenderer from "@/components/htmlRenderer/HtmlRenderer";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const SecondarySection = ({ section, onDelete, onEdit }) => {
  return (
    <div className="p-4 bg-white rounded-md border border-Line mb-4 mt-3">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h3 className="text-xl font-semibold">SECTION ID : {section._id}</h3>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-medium">{section.title}</h3>
        <p className="text-sm mt-1">{section.subtitle}</p>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-10 mt-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Data Type :</h3>
          <p className="text-sm mt-1">{section.type}</p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Section rank :</h3>
          <p className="text-sm mt-1">{section.rank}</p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Show on Landing :</h3>
          <p className="text-sm mt-1">{section.showOnLanding ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Section Content */}
      <div className="mt-4">
        {section.contentType === "list" && (
          <div className="space-y-2">
            {section.content.map((text, index) => (
              <h1 className="flex items-center" key={index}>
                <span className="h-2 w-2 inline-block bg-secondary rounded-full"></span>
                <span className="ms-3 text-sm">{text}</span>
              </h1>
            ))}
          </div>
        )}

        {section.contentType === "image" && section.content && (
          <div className="mt-6 max-w-[500px] mx-auto h-[500px]">
            <Image
              src={section.content}
              alt=""
              height={400}
              width={400}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {section.contentType === "html" && (
          <div className="mt-6">
            <HtmlRenderer html={section.content} />
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="text-end space-x-3 mt-4">
        <button
          className="text-sm font-medium text-white px-6 py-2 bg-secondary rounded-lg"
          onClick={async () => {
            if (!confirm("Are you sure you want to delete this section?"))
              return;
            try {
              await API.delete(
                `/configurepage/secondarysection?_id=${section._id}`
              );
              toast.success("Section deleted successfully!");
              // UI থেকে সাথে সাথে সরিয়ে দাও
              onDelete(section._id);
            } catch (err) {
              console.error(err);
              toast.error("Failed to delete section");
            }
          }}
        >
          Delete
        </button>
        <button
          className="text-sm font-medium text-white px-6 py-2 bg-primary rounded-lg"
          onClick={() => onEdit(section)}
        >
          Edit Section
        </button>
      </div>
    </div>
  );
};

export default SecondarySection;