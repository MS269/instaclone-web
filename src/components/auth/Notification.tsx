import styled from "styled-components";

interface INotificationProps {
  message: string | undefined;
}

const SNotification = styled.div`
  margin-top: 10px;
  color: #2ecc71;
  font-size: 14px;
  font-weight: 600;
`;

function Notification({ message }: INotificationProps) {
  return !message || message === "" ? null : (
    <SNotification>{message}</SNotification>
  );
}

export default Notification;
