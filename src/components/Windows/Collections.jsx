import { useEffect, useState } from "react"
import { Window } from "../@core/Window/Window"
import moment from "moment"
import { Add } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import {useDisk} from "@data"
import { TabView } from "../@core/TabView/TabView"
import { Collection } from "./Collection"
import "./Collections.sass"

export const Collections = () => {
  const [collections, setCollections] = useDisk("collections", {favourites: {name: "İlginç Yerler", items: []}})
  const updateCollection = (id) => ({ name, items }) => {
    if(collections[id]) {
      name = name || collections[id].name
      items = items || collections[id].items
    }
    setCollections({...collections, [id]: {name, items}})
  }
  const newCollection = () => openDialog()
  return <Window title="Koleksiyonlar">
    <div className="collections">
      <TabView tabs={Object.keys(collections).map(id=>({id, name: collections[id].name}))} endAdornment={<IconButton onClick={newCollection}><Add/></IconButton> }>
        {
          ({ id, name, current }) =>
            <Collection key={id} id={id} name={name} items={current == id ? collections[id].items : []} onUpdate={updateCollection(id)}/>
        }
      </TabView>
    </div>
  </Window>
}