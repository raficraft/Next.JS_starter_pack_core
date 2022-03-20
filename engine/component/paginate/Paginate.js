import {
  ArrowLeft,
  ArrowRight,
  FirstPage,
  LastPage,
} from "../../../assets/icons/Icon_svg";

export default function Paginate({
  collectionLength,
  perPage,
  currentPage,
  goToPage,
  nbPage,
  limit = [3, 1],
  keyPrefix = "paginate",
  setter,
  handleSelectChange,
}) {
  console.log("in paginate", setter);
  console.log("in paginate", nbPage);
  function createPaginate() {
    const paginate = [];
    let getDottedEnd = false;
    let getDottedStart = false;
    let addPrevButton = false;
    let addNextButton = false;
    let nbMax = limit[0] + limit[1];
    const count = Math.ceil(parseInt(collectionLength) / parseInt(perPage));
    const startLoop =
      currentPage > count - limit[0] ? count - limit[0] : currentPage;

    if (count > limit[0] + limit[1]) {
      for (let idx = startLoop; idx <= count; idx++) {
        if (!addPrevButton) {
          if (currentPage > 1) {
            paginate.push(
              <button onClick={() => goToPage(0, 1)}>
                <FirstPage></FirstPage>
              </button>
            );
          }
          if (currentPage > 2) {
            paginate.push(
              <button onClick={() => goToPage(idx - 2, pageNumber - 1)}>
                <ArrowLeft></ArrowLeft>
              </button>
            );
          }

          addPrevButton = true;
        }

        let pageNumber = idx;

        if (currentPage > 2) {
          if (!getDottedStart) {
            paginate.push(<button disabled="disabled">...</button>);
            getDottedStart = true;
          }
        }

        if (pageNumber < limit[0] + currentPage) {
          paginate.push(
            <button
              onClick={() => {
                goToPage(pageNumber - 1, pageNumber);
              }}
              data-current={currentPage === pageNumber ? true : false}
            >
              {pageNumber}
            </button>
          );
        } else if (pageNumber > limit[0] + currentPage) {
          if (!getDottedEnd) {
            paginate.push(<button disabled="disabled">...</button>);
            getDottedEnd = true;
          }
        }
      }
    } else {
      //console.log("loop 2");
      for (let idx = 0; idx < count; idx++) {
        let pageNumber = idx + 1;
        paginate.push(
          <button
            onClick={() => {
              goToPage(pageNumber - 1, pageNumber);
            }}
            data-current={currentPage === pageNumber ? true : false}
          >
            {pageNumber}
          </button>
        );
      }
    }

    if (!addNextButton) {
      if (currentPage < count - limit[0] + 1 && count > nbMax) {
        paginate.push(
          <>
            <button onClick={() => goToPage(currentPage, currentPage + 1)}>
              <ArrowRight></ArrowRight>
            </button>
            <button onClick={() => goToPage(count - 1, count)}>
              <LastPage></LastPage>
            </button>
          </>
        );
      }
      addNextButton = true;
    }
    return paginate;
  }

  console.log("render Paginate");
  return (
    <>
      <header>
        <div>
          <label>Nombre d'avis afficher : </label>
          <select
            defaultValue={perPage}
            onChange={(e) => {
              handleSelectChange(e);
            }}
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="20">20</option>
          </select>
        </div>

        <p>{collectionLength} avis.</p>
      </header>
      <div>,{createPaginate()}</div>
    </>
  );
}
