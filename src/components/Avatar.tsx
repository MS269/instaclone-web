import styled from "styled-components";

interface IAvatarProps {
  url: string;
}

const SAvatar = styled.div`
  background-color: #2c2c2c;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url }: IAvatarProps) {
  return <SAvatar>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
