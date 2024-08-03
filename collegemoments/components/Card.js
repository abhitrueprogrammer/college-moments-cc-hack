// components/Card.js
export default function Card({ title, description, imageSrc, link }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        {imageSrc && (
          <img
            className="w-full h-48 object-cover"
            src={imageSrc}
            alt={title}
          />
        )}
        <div className="p-6">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
          {link && (
            <a
              href={link}
              className="mt-4 inline-block bg-z text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Learn More
            </a>
          )}
        </div>
      </div>
    )
  }
  