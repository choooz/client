import { useOutsideClick, useToggle } from "@monorepo/hooks";
import { Button } from "@monorepo/ui";
import { media } from "@monorepo/ui/styles/media";
import Path from "lib/Path";
import { isLogin, logout } from "lib/utils/auth";
import { useRouter } from "next/navigation";
import ProfileIcon from "public/icons/ProfileIcon";
import styled, { css } from "styled-components";

function HeaderSelect() {
  const router = useRouter();

  const [isOpen, onToggleOpen] = useToggle();

  const { targetEl } = useOutsideClick<HTMLDivElement>(isOpen, onToggleOpen);

  const USER_ICON_LIST = [
    { value: "myPage", label: "마이페이지" },
    { value: "logout", label: "로그아웃" },
  ];

  const onChangeSelectedOption = (value: any) => {
    if (value === "myPage") {
      router.push(Path.MY_PAGE);
    } else if (value === "logout") {
      logout();
    }
  };

  const onClickProfileIcon = () => {
    if (isLogin()) {
      onToggleOpen();
    } else {
      router.push(Path.LOGIN_PAGE);
    }
  };

  return (
    <Container ref={targetEl}>
      <Button onClick={onClickProfileIcon}>
        <IconWrapper>
          <ProfileIcon width="100%" height="100%" />
        </IconWrapper>
      </Button>
      {isOpen ? (
        <Ul id="select-list" aria-labelledby="select-box-1" role="listbox">
          {USER_ICON_LIST.map(({ value, label }) => (
            <Li
              role="option"
              key={`select_${value}`}
              onClick={() => {
                onChangeSelectedOption(value);
                onToggleOpen();
              }}
            >
              {label}
            </Li>
          ))}
        </Ul>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 36px;
  right: 5px;
  margin-top: 8px;
  border-radius: 8px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;
  width: 100px;
  height: 100px;
  ${media.medium} {
    width: 136px;
    height: 108px;
    top: 44px;
    right: 8px;
  }
  ${({ theme }) =>
    css`
      border: solid 1px ${theme.palette.border.base};
      background-color: ${theme.palette.background.white};
      color: ${theme.palette.ink.dark};
      li:nth-child(2) {
        color: ${theme.palette.system.danger};
        text-decoration: underline;
      }
    `}
`;

const Li = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  ${({ theme }) => css`
    ${theme.textStyle.Font_Regular};
    ${media.medium} {
      ${theme.textStyle.Title_Small};
    }
  `}
`;

const ICON_SIZE = {
  MOBILE: 28,
  DESKTOP: 40,
};

const IconWrapper = styled.div`
  position: relative;
  width: ${ICON_SIZE.MOBILE}px;
  height: ${ICON_SIZE.MOBILE}px;
  ${media.medium} {
    width: ${ICON_SIZE.DESKTOP}px;
    height: ${ICON_SIZE.DESKTOP}px;
  }
`;

export default HeaderSelect;
