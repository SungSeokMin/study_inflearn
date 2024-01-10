import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import CheckboxChecked from '../assets/svg/checkbox-checked.svg';
import CheckboxUnChecked from '../assets/svg/checkbox-unchecked.svg';
import DeleteIcon from '../assets/svg/delete.svg';
import { useDispatch } from 'react-redux';
import { DELETE_TODO, UPDATE_TODO } from '../redux/slices/todoSlice';

const TodoItem = ({ id, text, state }) => {
  const dispatch = useDispatch();
  const onCheck = () => dispatch(UPDATE_TODO(id));
  const onDelete = () => dispatch(DELETE_TODO(id));

  return (
    <View style={styles.itemContainer}>
      <Pressable style={styles.itemCheckbox} hitSlop={10} onPress={onCheck}>
        {state === 'todo' ? (
          <CheckboxUnChecked />
        ) : (
          <CheckboxChecked style={styles.itemCheckboxCheckedIcon} />
        )}
      </Pressable>

      <Text style={[styles.itemText, state === 'done' ? styles.itemTextChecked : null]}>
        {text}
      </Text>

      <Pressable
        style={[styles.deleteButton, state === 'done' ? styles.deleteButtonDone : null]}
        hitSlop={10}
        onPress={onDelete}
      >
        <DeleteIcon />
      </Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f7f8fa',
  },
  itemCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
  },
  itemCheckboxCheckedIcon: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  itemText: {
    marginRight: 'auto',
    paddingRight: 25,
    fontSize: 15,
    lineHeight: 20,
    color: '#737373',
  },
  itemTextChecked: {
    opacity: 0.3,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    opacity: 0.8,
  },
  deleteButtonDone: {
    opacity: 0.3,
  },
});
