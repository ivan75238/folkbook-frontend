export const Paths = {
    main : {
        list : {
            path : () => `/`,
            mask : () => `/`
        }
    },
    books : {
        book : {
            path : (id) => `/book/${id}`,
            mask : () => `/book/:id`,
        },
        all : {
            path : () => `/book/all`,
            mask : () => `/book/all`,
        },
    },
    auth: {
        auth: {
            path: () => '/',
            mask: () => '/'
        },
        registration: {
            path: () => '/registration',
            mask: () => '/registration'
        }
    },
    settings: {
        path: () => '/settings',
        mask: () => '/settings'
    }
};
