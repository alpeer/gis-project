

export const ViewMessage = ({ from, contents }) => {


}



export const ReplyMessage = ({ to }) => {
  const useInitialState(to, null)

}

export const useInitialState = (initialValue, defaultValue) => {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  return [value, setValue]
}