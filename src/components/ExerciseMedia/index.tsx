'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExerciseMediaProps {
  exerciseId: string;
  exerciseName: string;
  hasVideo?: boolean;
  hasImages?: boolean;
}

export const ExerciseMedia: React.FC<ExerciseMediaProps> = ({
  exerciseId,
  exerciseName,
  hasVideo = true,
  hasImages = true,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'images'>('video');
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate placeholder video URL - you can replace with actual video URLs
  const videoUrl = `/videos/exercises/${exerciseId}.mp4`;
  const imageUrls = [
    `/images/exercises/${exerciseId}-1.jpg`,
    `/images/exercises/${exerciseId}-2.jpg`,
    `/images/exercises/${exerciseId}-3.jpg`,
  ];

  const VideoPlayer = () => (
    <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
      {!videoError ? (
        <video
          controls
          className="w-full h-full object-cover"
          poster={`/images/exercises/${exerciseId}-poster.jpg`}
          onError={() => setVideoError(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">🎥</div>
          <h3 className="text-lg font-medium mb-2">Video Demo</h3>
          <p className="text-sm text-center mb-4">Demonstrasi teknik {exerciseName}</p>
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 max-w-sm">
            <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
              Video sedang dalam tahap pengembangan. <br />
              Akan tersedia segera dengan demonstrasi lengkap!
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const ImageGallery = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            {!imageError ? (
              <Image
                src={imageUrl}
                alt={`${exerciseName} - Posisi ${index + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm text-center px-2">
                  Gambar {index + 1}
                </p>
                <div className="text-xs text-gray-400 mt-2 px-4 text-center">
                  Sedang disiapkan
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {imageError && (
        <div className="bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
            📷 Galeri foto demonstrasi sedang dalam tahap pengembangan. <br />
            Akan menampilkan gambar step-by-step untuk setiap latihan!
          </p>
        </div>
      )}
    </div>
  );

  if (!hasVideo && !hasImages) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      {hasVideo && hasImages && (
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'video'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            🎥 Video Demo
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'images'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            📸 Galeri Gambar
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {hasVideo && (activeTab === 'video' || !hasImages) && <VideoPlayer />}
        {hasImages && (activeTab === 'images' || !hasVideo) && <ImageGallery />}
      </div>

      {/* Media Info */}
      <div className="px-6 pb-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-between">
          <span>Media untuk: {exerciseName}</span>
          <div className="flex items-center space-x-4">
            {hasVideo && (
              <span className="flex items-center">
                🎥 Video HD
              </span>
            )}
            {hasImages && (
              <span className="flex items-center">
                📸 {imageUrls.length} Gambar
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};