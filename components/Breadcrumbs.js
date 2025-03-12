import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" className="py-3">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {/* Home Link */}
        <li>
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
        </li>

        {pathSegments.length > 0 &&
          pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

            return (
              <li key={href} className="flex items-center">
                <span className="mx-2">/</span>
                {!isLast ? (
                  <Link href={href} className="hover:text-blue-600 capitalize">
                    {decodeURIComponent(segment.replace(/-/g, " "))}
                  </Link>
                ) : (
                  <span className="text-gray-500 capitalize">
                    {decodeURIComponent(segment.replace(/-/g, " "))}
                  </span>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
