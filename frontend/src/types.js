/**
 * @typedef {React.ChangeEvent<HTMLInputElement>} ChangeInputEvent
 * @typedef {React.MouseEvent<HTMLAnchorElement>} MouseAnchorEvent
 * @typedef {import("react-router-dom").NavigateFunction} NavigateFunction
 * @typedef {React.Dispatch<React.SetStateAction<unknown>>} SetResponse
 * @typedef {React.SubmitEvent<HTMLFormElement>} SubmitFormEvent
 * @typedef {(path: string, data: object, setResponse: SetResponse, navigate: NavigateFunction) => void} SubmitHandler
 */

/**
 * @template {object} T
 * @typedef {React.Dispatch<React.SetStateAction<T>>} SetRecord
 */