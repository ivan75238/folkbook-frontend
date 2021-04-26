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
    liked_books : {
        list : {
            path : () => `/liked_book/list`,
            mask : () => `/liked_book/list`,
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
