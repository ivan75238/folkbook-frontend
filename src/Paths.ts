export const Paths = {
    main : {
        list : {
            path : () => `/`,
            mask : () => `/`
        }
    },
    books : {
        book : {
            path : (id: number) => `/book/${id}`,
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
        }
    },
    settings: {
        path: () => '/settings',
        mask: () => '/settings'
    }
};
