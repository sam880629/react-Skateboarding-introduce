const Block1 = () => {
  return (
    <div className="w-screen h-screen page-hero">
      <video
        className="w-full h-full object-cover"
        width="1920"
        height="1080"
        muted
        autoPlay
        loop
        playsInline
        disableRemotePlayback
        src="/assets/videos/blockVideo1.mp4"
        data-src="/assets/videos/blockVideo2.mp4"
        data-src-mobile="/assets/videos/blockVideo2.mp4"
      />
    </div>
  );
};

export default Block1;
