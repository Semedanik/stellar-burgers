import { rootReducer } from './store';
import ingredientReducer from './slices/ingredient';
import constructorReducer from './slices/constructor';
import orderReducer from './slices/order';
import feedReducer from './slices/feed';
import userReducer from './slices/user';

describe('Проверка корневого редьюсера', () => {
  it('корректно инициализирует все модули состояния', () => {
    const unknownAction = { type: '@@INIT' };

    const resultState = rootReducer(undefined, unknownAction);
    expect(resultState).toMatchObject({
      ingredient: ingredientReducer(undefined, unknownAction),
      constructorItems: constructorReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction)
    });
  });

  it('сохраняет ссылочную целостность при неизменном состоянии', () => {
    const initial = rootReducer(undefined, { type: '@@INIT' });
    const testAction = { type: 'TEST_ACTION' };
    const newState = rootReducer(initial, testAction);

    expect(newState).toBe(initial);
  });

  it('обрабатывает несуществующие действия', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: null };
    expect(() => rootReducer(undefined, action)).not.toThrow();
  });
});
