import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="surface p-6 sm:p-8">
        <span className="chip">离线提示</span>
        <h1 className="mt-4 text-3xl font-black text-slate-950">
          页面暂时离线，已保存的数据仍在本机
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          网络恢复后可重新打开页面。Ollama 和浏览器本地模型仍取决于当前设备和已下载资源。
        </p>
        <Link className="button-primary mt-5" href="/">
          返回首页
        </Link>
      </section>
    </div>
  );
}
