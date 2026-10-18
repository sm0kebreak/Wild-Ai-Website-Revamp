import React from 'react';
import { useLocation } from 'react-router-dom';
import { photoForPath, photoFrame, photoSrc, photoSrcSet } from '@/data/sitePhotos';

/** Full-frame event photo. The image keeps its own ratio; nothing is cropped. */
export const SitePhoto = ({ stem }: { stem: string }) => {
  const photo = photoFrame(stem);
  return (
    <div className="page-hero__media">
      <img
        className="page-hero__photo"
        src={photoSrc(stem)}
        srcSet={photoSrcSet(stem)}
        sizes="(min-width: 1024px) 736px, 100vw"
        alt=""
        width={photo.width}
        height={photo.height}
        decoding="async"
      />
    </div>
  );
};

const RoutePhoto = () => {
  const { pathname } = useLocation();
  return <SitePhoto stem={photoForPath(pathname)} />;
};

export default RoutePhoto;
