import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud-50 px-5">
      <div className="max-w-md text-center">
        <span className="text-sm font-bold text-water-600">404</span>
        <h1 className="mt-3 text-3xl font-bold text-ink-950">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-sm leading-6 text-ink-600">주소가 변경되었거나 아직 공개되지 않은 페이지입니다.</p>
        <Link className="mt-6 inline-flex rounded-md bg-ink-950 px-4 py-2 text-sm font-semibold text-white" href="/">
          홈으로 이동
        </Link>
      </div>
    </main>
  );
}
