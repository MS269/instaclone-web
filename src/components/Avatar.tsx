import styled from "styled-components";

interface IAvatarProps {
  url: string;
  lg: boolean;
}

interface ISAvatarProps {
  lg: boolean;
}

const SAvatar = styled.div<ISAvatarProps>`
  background-color: #2c2c2c;
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url, lg }: IAvatarProps) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

Avatar.defaultProps = {
  url: "",
  lg: false,
};

export default Avatar;
