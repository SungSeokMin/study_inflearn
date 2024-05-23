import Link from "next/link";

interface NotFoundProps {
}

const NotFound = ({}: NotFoundProps) => {
  return <div>
    <div>존재하지 않는 페이지 입니다.</div>
    <Link href="/search">검색</Link>
  </div>
};

export default NotFound;