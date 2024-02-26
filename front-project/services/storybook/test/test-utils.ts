import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

// expect 나 tobe를 사용하기 위해서는 이게 필요한데 매번 사용하기 귀찮으니 여기서 퉁치자
import "@testing-library/jest-dom";

// 스토리북을 쓰기 위한 새로운 세팅
import * as globalStorybookConfig from "../.storybook/preview";

import { setProjectAnnotations } from "@storybook/react";

// @ts-ignore
setProjectAnnotations(globalStorybookConfig);

// 매 실행마다 코드가 cleanup되게 만들어 반복적으로 테스트가 실행될 때 서로에게 영향을 주지 않음
afterEach(() => {
  cleanup();
});

// provider를 감싼다면 여기서 감싸란다.
function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// override render export
export { customRender as render };
