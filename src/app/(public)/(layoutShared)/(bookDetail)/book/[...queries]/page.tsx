"use client";
import { BookProps, IBook } from "@/utils/interface/IBook";
import { FC, useEffect, useState } from "react";
import { apiGetBookById, apiGetBooks } from "@/api";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { CustomSlider, TitleBook, Loading, Button } from "@/components";
import DOMPurify from "dompurify";
interface pageProps {
  params: { queries: [slug: string, bid: string] };
}

const Page: FC<pageProps> = ({ params }) => {
  const [book, setBook] = useState<IBook | null>(null);
  const [relative, setRelative] = useState<BookProps | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const fetchData = async () => {
    setPending(true);
    await apiGetBookById(params.queries[1]).then((rs) => {
      if (rs.data.error === 0) {
        setBook(rs.data.bookData);
        setPending(false);
        setError(false);
      } else setError(true);
    });
  };

  const fetchDataRandom = async () => {
    setPending(true);
    await apiGetBooks({
      limit: 10,
      page: Math.round(Math.random() * 10),
    }).then((rs) => {
      if (rs.data.error === 0) {
        setRelative(rs.data);
        setPending(false);
        setError(false);
      } else setError(true);
    });
  };

  useEffect(() => {
    if (params.queries[1]) {
      fetchData();
      fetchDataRandom();
    }
  }, [params.queries[1]]);

  return (
    <>
      <div className="w-main mx-auto p-20">
        {pending ? (
          <Loading />
        ) : error ? (
          <p>Something went wrong !</p>
        ) : (
          book && (
            <>
              <div className="flex">
                <div className="shadow-menu mr-[10rem] h-[37rem] overflow-y-hidden  ">
                  <Image
                    src={book.image.path}
                    alt="image"
                    height={100}
                    width={377}
                  />
                </div>
                <div className="basis-8/12">
                  <h1 className="text-[3.4rem] font-read font-bold mb-2">
                    {book.title}
                  </h1>
                  <span className="uppercase text-[1.2rem] font-semibold font-header mb-4">
                    format
                  </span>
                  <div className="bg-[#F6F5F7] w-[20rem] py-[4rem] px-[1rem] h-[5rem] border-2 border-[#573ba3] justify-center flex items-start flex-col gap-2">
                    <h1 className="text-3xl text-purple">Paperback</h1>
                    <p className="text-[1.6rem] font-semibold font-read">
                      ${book.price}
                    </p>
                  </div>
                  <div>
                    {book.available >= 1 ? (
                      <div className="mt-8">
                        <FontAwesomeIcon
                          icon={icon.faCircleCheck}
                          className="text-[#1fa5a3] text-[1.5rem] mr-2"
                        />
                        <span className="text-[1.5rem] text-[#1fa5a3] uppercase font-medium">
                          available
                        </span>
                      </div>
                    ) : (
                      <div className="mt-8">
                        <FontAwesomeIcon
                          icon={icon.faCircleXmark}
                          className="text-red text-[1.5rem] mr-2"
                        />
                        <span className="text-[1.5rem] text-red uppercase font-medium">
                          out the stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <div className="mr-6">
                      <Button
                        name="ADD TO CART"
                        status={true}
                        hanleOnClick={() => {}}
                      />
                    </div>
                    <div>
                      <Button
                        name="ADD TO WISHLIST"
                        status={true}
                        hanleOnClick={() => {}}
                        style="bg-white px-10 py-3 text-purple font-main 
                        text-2xl rounded-full my-8 uppercase font-bold border-2 border-[#6B0DDE]"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-[2.8rem] font-serif font-semibold">
                      Description
                    </h1>
                    <div
                      className="text-[1.6rem]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(book.description),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <TitleBook title="Random" />
                {pending ? (
                  <Loading />
                ) : error ? (
                  <p>Something went wrong !</p>
                ) : (
                  <>
                    <CustomSlider books={relative?.books} />
                  </>
                )}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Page;
