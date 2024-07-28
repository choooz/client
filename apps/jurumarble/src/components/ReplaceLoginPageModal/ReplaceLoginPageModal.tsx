import { ModalTemplate } from "@monorepo/ui";
import Path from "lib/Path";
import { getClassNames } from "lib/styles/getClassNames";
import Link from "next/link";

import styles from "./styles.module.css";

const cx = getClassNames(styles);

interface Props {
  onToggleReplaceLoginPageModal: () => void;
}

const ReplaceLoginPageModal = ({ onToggleReplaceLoginPageModal }: Props) => {
  return (
    <ModalTemplate width="335px" height="172px" onToggleModal={onToggleReplaceLoginPageModal}>
      <div className={cx("container")}>
        <div className={cx("modal-text", "headline02")}>로그인 후, 이용하실 수 있습니다</div>
        <div className={cx("buttons")}>
          <button
            className={cx("button", "cancel-button", "body01")}
            onClick={onToggleReplaceLoginPageModal}
          >
            취소
          </button>
          <Link href={Path.LOGIN_PAGE} className={cx("button", "complete-button", "body01")}>
            확인
          </Link>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ReplaceLoginPageModal;
