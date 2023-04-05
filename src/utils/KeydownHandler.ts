export class KeydownHandler {
    private currentVideoTagIndex = 0;
    
    constructor(private videoTags: NodeListOf<HTMLVideoElement>) {}
  
    attachEvent() {
      window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          const tag = this.videoTags[this.currentVideoTagIndex];
          tag.paused ? tag.play() : tag.pause();
        }
      });
    }

    setCurrentVideoTagIndex(index: number) {
        this.currentVideoTagIndex = index;
      }
  }