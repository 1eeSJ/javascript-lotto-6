import { MissionUtils } from "@woowacourse/mission-utils";
import InputVeiw from "../src/veiw/input-veiw";

const mockInput = (input) => {
    MissionUtils.Console.readLineAsync = jest.fn();
    MissionUtils.Console.readLineAsync.mockResolvedValue(input);
};

describe("입력값 테스트", () => {
    test("구입 금액 입력 테스트", async () => {
        //given
        const input = 14000;
        mockInput(input);

        //when
        const inputValue = new InputVeiw();
        const output = await inputValue.readPurchaseAmount();

        //then
        expect(output).toEqual(14);
    });

    test("구입 금액이 1000으로 나누어 떨어지지 않을 경우 예외 처리", async () => {
        //given
        const input = 14500;
        mockInput(input);

        //when
        const inputValue = new InputVeiw();

        //then
        await expect(inputValue.readPurchaseAmount()).rejects.toThrow("[ERROR]");
    });

    test.each([
        0, -1000
      ])("구입 금액이 0 이하 일 경우 예외 처리", async (inputs) => {
        //given
        mockInput(inputs);

        //when
        const inputValue = new InputVeiw();

        //then
        await expect(inputValue.readPurchaseAmount()).rejects.toThrow("[ERROR]");
    });
});