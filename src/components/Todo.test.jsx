import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';


Enzyme.configure({ adapter: new Adapter() });

describe('<TodoList />', () => {
  it('TodoList component is defined', () => {
    expect(TodoList).toBeDefined();
  });

  it('TodoInput component is defined', () => {
    expect(TodoInput).toBeDefined();
  });

  it('TodoItem component is defined', () => {
    expect(TodoItem).toBeDefined();
  });

  it('input tag in TodoInput', () => {
    const wrapper = shallow(<TodoInput />);
    const input = wrapper.find('input');
    expect(input.get(0).props.value).toEqual(undefined); //input.prop('value')
  });

  test('Todo Input button with text during edit', () => {
    const props = { editItem: true };
    const wrapper = shallow(<TodoInput {...props} />);
    expect(wrapper.find('#inputButton').text()).toContain('edit item');
  });

  test('TodoList Fuction calls', () => {
    const mockCallback = jest.fn();
    const mockCallback1 = jest.fn();
    const props = {
      items: [{ id: '9ab55908-bf3a-4162-b7b7-cff4565bd06a', title: 'test' }],
      handleDelete: mockCallback,
      handleEdit: mockCallback1
    };
    const wrapper = shallow(<TodoList {...props} />);
    wrapper.find('TodoItem').prop('handleDelete')();
    wrapper.find('TodoItem').prop('handleEdit')();
    expect(mockCallback.mock.calls[0][0]).toBe('9ab55908-bf3a-4162-b7b7-cff4565bd06a');
    expect(mockCallback1.mock.calls[0][0]).toBe('9ab55908-bf3a-4162-b7b7-cff4565bd06a');
  })

});
