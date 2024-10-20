import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useRef } from "preact/hooks";

export default function webglOnWorker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (IS_BROWSER) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log(devices);
      });
      navigator.mediaDevices.getUserMedia({
        video: {
          height: {
            ideal: 720,
          },
          width: {
            ideal: 1090,
          },
          facingMode: "user",
        },
      }).then((stream) => {
        stream.getTracks().forEach((track) => {
          console.log("实际约束值", track.getSettings());
          console.log("当前贵到支持的约束值：", track.getCapabilities());
        });
        videoRef.current!.srcObject = stream;
      }).catch((e) => {
        globalThis.alert(e.message);
      });
      // 获得所有支持的约束属性
      console.log(navigator.mediaDevices.getSupportedConstraints());
    }
  }, [videoRef]);

  return <video autoPlay controls class="min-h-lvh" ref={videoRef}></video>;
}
