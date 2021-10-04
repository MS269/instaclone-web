import { Helmet } from "react-helmet-async";

interface IPageTitleProps {
  title: string;
}

function PageTitle({ title }: IPageTitleProps) {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
}

export default PageTitle;
