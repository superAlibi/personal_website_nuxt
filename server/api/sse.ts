
let inv: NodeJS.Timeout;
const encoder = new TextEncoder();
let control: ReadableStreamDefaultController;
export default defineEventHandler(async (event) => {
  const stram = new ReadableStream({
    start(controller) {
      control = controller;
      inv = setInterval(() => {
        const message = `event: message\ndata: It is ${new Date().toISOString()
          }\n\n`;
        console.log(message);
        controller.enqueue(encoder.encode(message));
      }, 1000);
    },
    cancel() {
      console.log("关闭时间", new Date().toISOString());
      clearInterval(inv);
      control.close();
    },
  });
  return new Response(stram, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
      "Transfer-Encoding": "chunked",
    },
  });
})
