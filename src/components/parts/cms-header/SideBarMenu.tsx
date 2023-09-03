import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { produce } from "immer";
import { useQuery } from "react-query";

import { Icon } from "~/components/icons";
import { Modal } from "~/components/styled-bases";
import UnsavedWarningPanel from "~/components/UnsavedWarningPanel";
import { WithTooltip } from "~/components/WithTooltip";

import { ComponentApiCx } from "./_state";

import { myDb } from "~/my-firebase/firestore";

// import { signOut } from "next-auth/react";

// import { MainMenuIcon, SignOutIcon } from "~/components/ui-elements";

// □ refactor

export const SideBarMenu = () => (
  <Menu>
    {({ open }) => (
      <>
        <Menu.Button className="text-3xl text-gray-300 transition-colors duration-75 ease-in-out hover:text-gray-600">
          <Icon.HeaderMenu />
        </Menu.Button>

        <Transition
          show={open}
          as="div"
          className="fixed left-0 top-0 z-50 h-screen"
          enter="transition duration-300 ease-out"
          enterFrom="transform opacity-0 -translate-x-full"
          enterTo="transform opacity-100 translate-x-0"
          leave="transition duration-300 ease-out"
          leaveFrom="transform opacity-100 translate-x-0"
          leaveTo="transform opacity-0 -translate-x-full"
        >
          <Menu.Items className="h-full overflow-y-auto border-r-2 bg-white py-sm pl-md pr-2xl">
            <Content />
          </Menu.Items>
        </Transition>

        <Transition
          as="div"
          show={open}
          className="fixed inset-0 z-40 bg-white/60"
          enter="transition duration-300 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-300 ease-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        />
      </>
    )}
  </Menu>
);

const Content = () => (
  <div className="flex min-h-full flex-col gap-3xl">
    <div className="flex flex-col items-start gap-xl">
      <div className="text-xl font-medium uppercase">
        The Birch <br />
        Collective
      </div>
      <PageLinks />
    </div>
    <div>
      <Logout />
    </div>
  </div>
);

const PageLinks = () => (
  <div className="flex flex-col gap-sm">
    <PageLink route="/" text="Home" />
    <PageLink route="/about" text="About" />
    <PageLink route="/careers" text="Careers" />
    <PageLink route="/donate" text="Donate" />
    <Programmes />
    <PageLink route="/testimonials" text="Testimonials" />
    <PageLink route="/theory-of-change" text="Theory of change" />
    <PageLink route="/volunteer-positions" text="Volunteer positions" />
    <Workshops />
  </div>
);

const PageLink = (props: { text: string; route: string }) => {
  const {
    data: { isChange },
  } = ComponentApiCx.use();

  const router = useRouter();

  const currentRoute = router.pathname;

  const goToPage = () => router.push(props.route);

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal: openWarningModal }) => (
        <div
          className="cursor-pointer text-gray-600 transition-colors duration-75 ease-in-out hover:text-blue-600"
          onClick={() => {
            if (currentRoute === props.route) {
              return;
            }

            if (isChange) {
              openWarningModal();
              return;
            }

            void goToPage();
          }}
        >
          {props.text}
        </div>
      )}
      panelContent={({ closeModal }) => (
        <UnsavedWarningPanel
          callback={() => void goToPage()}
          closeModal={closeModal}
        />
      )}
    />
  );
};

const Programmes = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);

  const processed = React.useMemo(() => {
    if (!programmesQuery.data) {
      return;
    }

    const valid = programmesQuery.data.filter(
      (programme) => programme.title.length,
    );

    const alphabetical = produce(valid, (draft) =>
      draft.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      }),
    );

    return alphabetical;
  }, [programmesQuery.data]);

  return (
    <div className={``}>
      <div className={`flex items-center gap-lg`}>
        <Link href="/programmes">
          <span className="text-gray-600 transition-colors duration-75 ease-in-out hover:text-blue-600">
            Programmes
          </span>
        </Link>
        {processed?.length ? (
          <WithTooltip
            text={isExpanded ? "hide programmes" : "show programmes"}
          >
            <span
              className={`cursor-pointer rounded-full p-xxs text-sm hover:bg-gray-100`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Icon.CaretUp /> : <Icon.CaretDown />}
            </span>
          </WithTooltip>
        ) : null}
      </div>

      {processed?.length ? (
        <div
          className={`flex flex-col gap-sm border-l pl-sm ${
            !isExpanded
              ? `mt-0 max-h-0 opacity-10`
              : `mt-md max-h-full opacity-100`
          } overflow-hidden transition-all duration-150 ease-in-out`}
        >
          {processed.map((programme) => (
            <NestedRouteLink
              id={programme.id}
              text={programme.title}
              parentType="programme"
              key={programme.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const Workshops = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const workshopsQuery = useQuery("workshops", myDb.workshop.fetchAll);

  const processed = React.useMemo(() => {
    if (!workshopsQuery.data) {
      return;
    }

    const valid = workshopsQuery.data.filter(
      (workshop) => workshop.title.length,
    );

    const alphabetical = produce(valid, (draft) =>
      draft.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      }),
    );

    return alphabetical;
  }, [workshopsQuery.data]);

  return (
    <div className={``}>
      <div className={`flex items-center gap-lg`}>
        <Link href="/workshops">
          <span className="text-gray-600 transition-colors duration-75 ease-in-out hover:text-blue-600">
            Workshops
          </span>
        </Link>
        {processed?.length ? (
          <WithTooltip text={isExpanded ? "hide workshops" : "show workshops"}>
            <span
              className={`cursor-pointer rounded-full p-xxs text-sm hover:bg-gray-100`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Icon.CaretUp /> : <Icon.CaretDown />}
            </span>
          </WithTooltip>
        ) : null}
      </div>

      {processed?.length ? (
        <div
          className={`flex flex-col gap-sm border-l pl-sm ${
            !isExpanded
              ? `mt-0 max-h-0 opacity-10`
              : `mt-md max-h-full opacity-100`
          } overflow-hidden transition-all duration-150 ease-in-out`}
        >
          {processed.map((workshop) => (
            <NestedRouteLink
              id={workshop.id}
              text={workshop.title}
              parentType="workshop"
              key={workshop.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const NestedRouteLink = ({
  id,
  text,
  parentType,
}: {
  text: string;
  id: string;
  parentType: "programme" | "workshop";
}) => {
  const {
    data: { isChange },
  } = ComponentApiCx.use();

  const router = useRouter();

  const currentRoute = !router.query.id
    ? "not-nested-route"
    : `/${parentType === "programme" ? "programmes" : "workshops"}/${
        router.query.id as string
      }`;

  const destinationRoute = `/${
    parentType === "programme" ? "programmes" : "workshops"
  }/${id}`;

  const goToPage = () => router.push(destinationRoute);

  return (
    <Modal.WithVisibilityProvider
      button={({ openModal: openWarningModal }) => (
        <div
          className="max-w-[200px] cursor-pointer capitalize text-gray-600 transition-colors duration-75 ease-in-out hover:text-blue-600"
          onClick={() => {
            if (currentRoute === destinationRoute) {
              return;
            }

            if (isChange) {
              openWarningModal();
              return;
            }

            void goToPage();
          }}
        >
          {text}
        </div>
      )}
      panelContent={({ closeModal }) => (
        <UnsavedWarningPanel
          callback={() => void goToPage()}
          closeModal={closeModal}
        />
      )}
    />
  );
};

const Logout = () => (
  <button
    className="group flex cursor-pointer items-center gap-sm capitalize text-gray-600"
    // onClick={() => void signOut()}
    type="button"
  >
    <span className="text-2xl text-gray-400 transition-colors duration-75 ease-in-out group-hover:text-blue-400">
      <Icon.SignOut />
    </span>
    <span className="transition-colors duration-75 ease-in-out hover:text-gray-800">
      Sign out
    </span>
  </button>
);
