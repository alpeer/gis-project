export const AreaOfInterest = () => {
  const elementsInArea = useDisk("ElementsInArea")
  return <ObjectList elements={elementsInArea}/>
}