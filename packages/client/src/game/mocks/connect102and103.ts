// ----- ...  где-то в коде MapScene ?

// [animatedViewsGetter, refrechAnimatedViewsGetter] = useState((ctx: CanvasRenderingContext2D) => []);
// // animatedViewsGetter - фабрика анимируемых объектов: пойдет в пропс в AnimationCanvas (внизу), сигнатура (ctx: CanvasRenderingContext2D) => AnimatableOnCanvas[]

// // в начале каждого хода
// let newGameObjectsIniter! : ((ctx: CanvasRenderingContext2D, params: GameObjectsParams) => void) = null

// // ...

// // если на карте появился новый объект(-ы) (старт игры, передвижение области видимости, ... )
// // создадим функцию для инициации новых объектов и их вьювок в контексте канваса

// newGameObjectsIniter = (ctx: CanvasRenderingContext2D, params: GameObjectsParams) =>
// {
// 	return params.map(gameObjectParams =>
// 	{
// 		const newGameObjectView = gameObjectParams.viewName in GameUnitName
//       ? createUnitView(ctx, gameObjectParams.viewName, gameObjectParams.position)
//       : createAnimatedView(ctx, gameObjectParams.viewName, gameObjectParams.position)

// 		return newGameObject = new GameObject(gameObjectParams, newGameObjectView)
// 		// в ход своего появления GameObject бездействует (анимация idle зпуститься автоматически, при инициации view)
// 	}
// }

// // isSetOfObjectsInVisibleAreaChanged = newGameObjectsIniter || ... какой-то анимируемый GameObject удалили

// if (isSetOfObjectsInVisibleAreaChanged)
// {
// 	// обновим фабрику анимируемых вьювок игровых объектов
// 	refrechAnimatedViewsGetter((ctx: CanvasRenderingContext2D) =>
// 	{
// 		map.gameObjects = [...map.gameObjects, ...newGameObjectsIniter(ctx)];

// 		return map.gameObjects
// 			.filter(gameObject => gameObject.view instanceof AnimatableView) // ... или gameObject.animated ?
// 			.map(gameObject => gameObject.view))
// 	})
// }

// // ...

// // в методе render среди слоев:
// <AnimationCanvas animatedViewsGetter={animatedViewsGetter} width={width} height={height}></AnimationCanvas>

// // сигнатура запуска анимаций (скоро появится) ~ gameObject.view.do(MoveMotionType.move, AxisDirection.top)

export {}
