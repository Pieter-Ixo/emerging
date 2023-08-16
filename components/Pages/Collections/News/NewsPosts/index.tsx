import { Center, Loader, Text } from "@mantine/core";

import NewsPost from "@/components/Pages/Collections/News/NewsPost";
import { useAppSelector } from "@/hooks/redux";
import {
  selectIsNewsPostsLoading,
  selectNewsPostsError,
} from "@/redux/entityCollections/selectors";
import { palette } from "@/theme/palette";
import { INewsPostExtended } from "@/types/news";

type Props = {
  newsPosts?: INewsPostExtended[];
};

export default function NewsPosts({ newsPosts }: Props) {
  const newsPostsError = useAppSelector(selectNewsPostsError);
  const isNewsPostsLoading = useAppSelector(selectIsNewsPostsLoading);

  if (isNewsPostsLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (newsPostsError) {
    return (
      <Text color={palette.redFull} size="md">
        Error: {newsPostsError}
      </Text>
    );
  }

  return (
    <div>
      {!isNewsPostsLoading &&
        !newsPostsError &&
        newsPosts?.length &&
        newsPosts?.map((post) => (
          <NewsPost
            imageUrl={post?.feature_image}
            date={post?.published_at}
            key={post?.id}
            title={post?.title}
            description={post?.excerpt}
          />
        ))}
    </div>
  );
}
