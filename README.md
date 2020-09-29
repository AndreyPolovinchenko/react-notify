# React-notify
```
import { Notifications, addNotification } from 'react-notify';
```

### Notifications
Container component for notifications, recommended to import in root app component

##### Props

- position?: ("top-right" (default) | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left")
- typeStyles?: Object - this property is using to rewrite default styles for different notification types, passed object is merging with default type styles, object keys is equal to notification types

###### TypeStyles
```
{
    success?: (your styles for success notification),
    warning?: (your styles for warning notificaion),
    ...
}
```

### addNotification

Function for adding notifications, which takes a message and object with params
- message: string | Function,

##### Params

- type?: ("default" (default) | "info" | "success" | "warning" | "error" | "dark"),
- onClose?: Function,
- onClick?: Function,
- autoClose?: Number | Boolean (default - 4000ms),
- pauseOnHover?: Boolean,
- transition?: ("fade" | "bounce" | "slide" (default) | Object (object with custom transition, which must be dependent on Transition state from ReactTransitionGroup)),
- transitionTimeout?: Number (default - 300ms),
- customCloseIcon?: Function,
- customStyles?: Object 

###### Custom transition
```
{
  entering?: (your styles for current transition state);
  entered?: (your styles for current transition state);
  exiting?: (your styles for current transition state);
  exited?: (your styles for current transition state);
  unmounted?: (your styles for current transition state);
}
```

###### CustomStyles
```
{
    root?: (your styles for notification component),
    closeWrapper?: (your styles for close icon wrapper),
    closeIcon?: (your styles for default close icon)
}
```
