import * as Types from '@game/core/types'
import GameObjectView from '@game/core/views/GameObjectView'
import GameObjectSprite from '@game/core/spriteApi/GameObjectSprite'
import imgResources from "@game/mocks/imgResources"

const createItemView : Types.GameObjectViewFactory = (ctx, objectName, position) => 
{
  let sprite
  switch (objectName)
  {
    case Types.GameItemName.coin:
    default:  
      sprite = new GameObjectSprite(ctx, imgResources.items)
    break;
  }
  return new GameObjectView(sprite as GameObjectSprite, position)
}

export default createItemView
