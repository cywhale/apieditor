import React from 'react';
import PropTypes from 'prop-types';

const EditorPaneBarLeft = ({ renderChildren, renderControls }) => {
  return (
    <div className="swagger-editor__editor-pane-bar swagger-editor__editor-pane-bar--left">
      <div className="swagger-editor__toolbar-vertical">{renderControls(null)}</div>
      {renderChildren(null)}
    </div>
  );
};

EditorPaneBarLeft.propTypes = {
  renderChildren: PropTypes.func,
  renderControls: PropTypes.func,
};

EditorPaneBarLeft.defaultProps = {
  renderChildren: (children) => children,
  renderControls: (controls) => controls,
};

export default EditorPaneBarLeft;
