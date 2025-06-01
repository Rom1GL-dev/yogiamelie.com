import { useState } from 'react';
import { useStores } from '@/providers/stores-provider';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config';
import { reformatForUrl } from '@/lib/utils.ts';
import { blogStore } from '@/stores/blogs-store.tsx';

const CommandPalette = observer(() => {
  const [search, setSearch] = useState('');
  const { userStore, eventStore } = useStores();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredUsers = userStore.users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEvents = eventStore.events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBlogs = blogStore.blogs.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = (email: string) => {
    navigate(APP_ROUTES.admin.users.path + '/' + email);
  };

  const handleSelectEvent = (eventTitle: string) => {
    navigate(APP_ROUTES.admin.events.path + '/' + reformatForUrl(eventTitle));
  };

  const handleSelectBlog = (eventTitle: string) => {
    navigate(APP_ROUTES.admin.blogs.path + '/' + reformatForUrl(eventTitle));
  };

  return (
    <div className="absolute top-1/2 left-1/2 z-50 flex w-3/4 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md md:w-2/4">
      <input
        type="text"
        placeholder="Rechercher un utilisateur ou un évènement"
        value={search}
        onChange={handleSearchChange}
        className="w-full border-b border-gray-200 p-3 focus:outline-none"
      />

      <div className="max-h-[300px] w-full space-y-2 overflow-y-auto p-3">
        {search.trim() === '' ? (
          <p className="text-center text-sm text-gray-400">
            Commencez à taper pour rechercher.
          </p>
        ) : filteredUsers.length > 0 ||
          filteredEvents.length > 0 ||
          filteredBlogs.length > 0 ? (
          <>
            {filteredUsers.length > 0 && (
              <>
                <h3 className="text-sm text-gray-500">Utilisateurs</h3>
                {filteredUsers.map((user) => (
                  <div
                    key={user.email}
                    onClick={() => handleSelectUser(user.email)}
                    className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-100"
                  >
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                ))}
              </>
            )}

            {filteredEvents.length > 0 && (
              <>
                <h3 className="mt-4 text-sm text-gray-500">Évènements</h3>
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleSelectEvent(event.title)}
                    className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-100"
                  >
                    <span className="text-gray-700">{event.title}</span>
                  </div>
                ))}
              </>
            )}

            {filteredBlogs.length > 0 && (
              <>
                <h3 className="text-sm text-gray-500">Blogs</h3>
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.title}
                    onClick={() => handleSelectBlog(blog.title)}
                    className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-100"
                  >
                    <span className="text-gray-700">{blog.title}</span>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <p className="text-center text-sm text-gray-400">Aucun résultat.</p>
        )}
      </div>
    </div>
  );
});

export default CommandPalette;
