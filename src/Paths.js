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
        }
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
    }
};
