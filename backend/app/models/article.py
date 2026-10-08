from sqlalchemy import String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Article(Base):
    __tablename__ = "articles"

    article_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # =========================
    # TITLE
    # =========================

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    title_telugu: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    # =========================
    # CONTEXT / DESCRIPTION
    # =========================

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    description_telugu: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # =========================
    # ARTICLE CONTENT
    # =========================

    content: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    content_telugu: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # =========================
    # ARTICLE IMAGES
    # =========================

    images: Mapped[list["ArticleImage"]] = relationship(
        "ArticleImage",
        back_populates="article",
        cascade="all, delete-orphan",
        order_by="ArticleImage.image_order"
    )


class ArticleImage(Base):
    __tablename__ = "article_images"

    image_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    article_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            "articles.article_id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    image_url: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    caption: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    image_order: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1
    )

    article: Mapped["Article"] = relationship(
        "Article",
        back_populates="images"
    )