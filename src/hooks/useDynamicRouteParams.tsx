import { useRouter } from "next/router";
import { checkObjectHasField } from "~/helpers/queryObject";

export const useDynamicRouteParams = () => {
  const router = useRouter();
  const query = router.query;
  const idParam = query.id as string | undefined;

  const queryLoaded = checkObjectHasField(query);

  return !queryLoaded
    ? "pending"
    : {
        idParam,
      };
};
